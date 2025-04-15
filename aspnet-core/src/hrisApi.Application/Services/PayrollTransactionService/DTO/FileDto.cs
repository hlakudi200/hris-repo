using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hrisApi.Services.PayrollTransactionService.DTO
{
    public class FileDto
    {
        //public string FileName { get; set; }
        //public string FileType { get; set; }
        //public byte[] FileContent { get; set; }


        /// <summary>
        /// File name including extension.
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// MIME type of the file.
        /// </summary>
        public string ContentType { get; set; }

        /// <summary>
        /// File content as byte array.
        /// </summary>
        public byte[] FileBytes { get; set; }

        /// <summary>
        /// File size in bytes.
        /// </summary>
        public long FileSize => FileBytes?.Length ?? 0;

        public FileDto()
        {
        }

        public FileDto(string fileName, string contentType)
        {
            FileName = fileName;
            ContentType = contentType;
        }

        public FileDto(string fileName, string contentType, byte[] fileBytes)
        {
            FileName = fileName;
            ContentType = contentType;
            FileBytes = fileBytes;
        }
    }
}
