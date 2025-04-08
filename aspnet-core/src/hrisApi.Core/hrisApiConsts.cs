using hrisApi.Debugging;

namespace hrisApi;

public class hrisApiConsts
{
    public const string LocalizationSourceName = "hrisApi";

    public const string ConnectionStringName = "Default";

    public const bool MultiTenancyEnabled = true;


    /// <summary>
    /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
    /// </summary>
    public static readonly string DefaultPassPhrase =
        DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "000cc61749d042f9a3e8a51c49f11bc0";
}
