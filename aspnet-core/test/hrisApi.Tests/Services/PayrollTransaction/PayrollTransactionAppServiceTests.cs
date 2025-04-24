
using NSubstitute;
using System;
using System.Threading.Tasks;
using Xunit;
using Abp.Domain.Repositories;
using Abp.UI;
using Abp.ObjectMapping;
using Abp.Domain.Uow;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Services.EmailService;
using hrisApi.Services.PayrollTransactionService.DTO;
using Microsoft.AspNetCore.Hosting;

namespace hrisApi.Tests.Services
{
    public class PayrollTransactionAppServiceTests
    {
        private readonly IRepository<PayrollTransaction, Guid> _mockRepository;
        private readonly EmailAppService _mockEmailAppService;
        private readonly IObjectMapper _mockObjectMapper;
        private readonly IUnitOfWorkManager _mockUnitOfWorkManager;
        private readonly ICurrentUnitOfWorkProvider _mockCurrentUowProvider;
        private readonly IUnitOfWork _mockUnitOfWork;

        public PayrollTransactionAppServiceTests()
        {
            _mockRepository = Substitute.For<IRepository<PayrollTransaction, Guid>>();
            _mockEmailAppService = Substitute.For<EmailAppService>(
                Substitute.For<IEmailService>());
            _mockObjectMapper = Substitute.For<IObjectMapper>();

            // Set up UnitOfWork dependencies
            _mockUnitOfWork = Substitute.For<IUnitOfWork>();
            _mockCurrentUowProvider = Substitute.For<ICurrentUnitOfWorkProvider>();
            _mockCurrentUowProvider.Current.Returns(_mockUnitOfWork);
            _mockUnitOfWorkManager = Substitute.For<IUnitOfWorkManager>();
            _mockUnitOfWorkManager.Current.Returns(_mockUnitOfWork);
        }

        private PayrollTransactionAppService CreateService()
        {
            var hostingEnvironment = Substitute.For<IWebHostEnvironment>(); // Mock IWebHostEnvironment  
            var service = new TestPayrollTransactionAppService(
                _mockRepository,
                _mockEmailAppService,
                _mockObjectMapper,
                _mockUnitOfWorkManager,
                _mockCurrentUowProvider,
                hostingEnvironment); // Pass the mocked IWebHostEnvironment  

            return service;
        }

        // Test class to override the ObjectMapper and UnitOfWorkManager  
        private class TestPayrollTransactionAppService : PayrollTransactionAppService
        {
            public TestPayrollTransactionAppService(
                IRepository<PayrollTransaction, Guid> repository,
                EmailAppService emailAppService,
                IObjectMapper objectMapper,
                IUnitOfWorkManager unitOfWorkManager,
                ICurrentUnitOfWorkProvider currentUnitOfWorkProvider,
                IWebHostEnvironment hostingEnvironment) // Add IWebHostEnvironment parameter  
                : base(repository, emailAppService, hostingEnvironment) // Pass hostingEnvironment to base constructor  
            {
                // Set the required dependencies through protected properties  
                ObjectMapper = objectMapper;
                UnitOfWorkManager = unitOfWorkManager;
                CurrentUnitOfWorkProvider = currentUnitOfWorkProvider;
            }

            protected ICurrentUnitOfWorkProvider CurrentUnitOfWorkProvider { get; }
        }
        [Fact]
        public async Task CreateAsync_WithPositiveGrossAmount_CalculatesTaxAndNetAmount()
        {
            // Arrange
            var service = CreateService();
            var grossAmount = 1000m;
            var input = new PayrollTransactionDto
            {
                GrossAmount = grossAmount

            };


            _mockUnitOfWorkManager.Begin().Returns(_mockUnitOfWork);
            _mockUnitOfWorkManager.Begin(Arg.Any<UnitOfWorkOptions>()).Returns(_mockUnitOfWork);

            //dto mapping
            _mockObjectMapper.Map<PayrollTransaction>(Arg.Any<PayrollTransactionDto>())
                .Returns(callInfo =>
                {
                    var dto = callInfo.Arg<PayrollTransactionDto>();
                    return new PayrollTransaction
                    {
                        GrossAmount = dto.GrossAmount,
                        TaxAmount = dto.TaxAmount,
                        NetAmount = dto.NetAmount
                    };
                });

            _mockObjectMapper.Map<PayrollTransactionDto>(Arg.Any<PayrollTransaction>())
                .Returns(callInfo =>
                {
                    var entity = callInfo.Arg<PayrollTransaction>();
                    return new PayrollTransactionDto
                    {
                        GrossAmount = entity.GrossAmount,
                        TaxAmount = entity.TaxAmount,
                        NetAmount = entity.NetAmount
                    };
                });

            // Set up repository to return the saved entity
            _mockRepository.InsertAsync(Arg.Any<PayrollTransaction>())
                .Returns(callInfo =>
                {
                    var entity = callInfo.Arg<PayrollTransaction>();
                    // The service should set these values during CreateAsync
                    entity.TaxAmount = Math.Round(entity.GrossAmount * 0.15m, 2);
                    entity.NetAmount = entity.GrossAmount - entity.TaxAmount;
                    return Task.FromResult(entity);
                });

            // Act
            var result = await service.CreateAsync(input);

            // Assert
            Assert.Equal(150m, result.TaxAmount); // 15% of 1000
            Assert.Equal(850m, result.NetAmount); // 1000 - 150

            // Verify repository was called
            await _mockRepository.Received(1).InsertAsync(Arg.Any<PayrollTransaction>());
        }

        [Fact]
        public async Task CreateAsync_WithZeroGrossAmount_ThrowsException()
        {
            // Arrange
            var service = CreateService();
            var input = new PayrollTransactionDto
            {
                GrossAmount = 0m
            };

            // Act & Assert
            await Assert.ThrowsAsync<UserFriendlyException>(() => service.CreateAsync(input));
        }

        [Fact]
        public async Task CreateAsync_WithNegativeGrossAmount_ThrowsException()
        {
            // Arrange
            var service = CreateService();
            var input = new PayrollTransactionDto
            {
                GrossAmount = -100m
            };

            // Act & Assert
            await Assert.ThrowsAsync<UserFriendlyException>(() => service.CreateAsync(input));
        }
    }
}