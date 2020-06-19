package com.java.yh.hotelmanage.utils;

import java.io.FileWriter;
import java.io.IOException;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *修改日期：2017-04-05
 *说明：  ksfxhw3818@sandbox.com   111111
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。
 */

public class AlipayConfig {
	
//↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

	// 应用ID,您的APPID，收款账号既是您的APPID对应支付宝账号
	public static String app_id = "2016101800715630";
	
	// 商户私钥，您的PKCS8格式RSA2私钥
    public static String merchant_private_key ="MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCT2nUtC+eJ/s2ZKog1fNlW+QQvKKzLZFxNzcQX17y8ejIbBDJauhO1lc4G9VRFm2nsY0gHrIZXPE5FA52eRRMHgTVURVAQcfCQ4SO6FfqlDV4XXG7tPxledOiH0vdlahdfQHBOnZsHp3R3NPAN22Zi+pqcHGcJhDMyZ2eipW3nqCi8oEKi5ZqwyQ926N2enzYdmUTvYfS+eRX1Qe0zusxiZkCAX9lseDc2K9/6kuH7zItjq/M5FWxBwDTVK2LFJtsfU9botsl9wI9AMzpxW5aned13hqkrkK25vq+RDR7GoZCQuPLD9mDEZom8dmzJvqbhoOr70YUfENk5J8wBpNP/AgMBAAECggEAPQsq6chKdkz/Mce/qOW9Dg2NzrKqdOcgvPbBiV6HDAIfgcv/xjmhPY12HKVZf8uktfZfnNt8M7QwVIojn17Bdo3AKOTdI40HV6m8iG3eqBqWyGpfWhB9NuRpxPozLmnY8Hi4ZZzojwZyLW1r1yzIXwE8qEuJtwIf6SWMQjiu4b+F6jyKOgEpXfGiyKZ0QcoHRLeKktMIkdoiISP6Ez8YWFNlgCn/q8lWs0OEYdGQ94QQQAv6xv/0n1NmW/ll4iu0N7RPPwguHVH1/Pl9ezZsc8hGp+PrL9/IX64zOGBEKKqfNKvVlKEVL8/mSkpqvf/omdlJtJ/Y8RgkHFppFSmwUQKBgQDuURQxNA47VXp8pnbiWKz0VOgqsPq62qZEuwgylYQcmnrXh4TamcMNpsZ1NGm74E9Amk1BWkvXKU0f9Uh4u3/wQfEbEC/s5uZBvPKSq31SkuyQuawX561DCxjVTkA0CCt23fQGxzQXZF1bwEt6mdCYH2Cth9SE503peWO7rQVJ9QKBgQCe0v265WU4WOnJTsv3rPnCVcmwdu2K3nsTHy88CPsuCT3puUMlN+64LAOcaeCJWD0+CCu/hd1Sa4mGwUW6VrBMmqkdpH7w+SwhIYrrz5hevWhlqSW3eKdMVf3Lg9dgPiRIEI6rTnWO8auu+gXZOYlKZ3tNAg+uaGGu73unRySpowKBgQDZIoaDTiqpZPh1Gja3hJQRCkt+mkHYfd+AP+j4LcJxTU8fkRo7El3l0k5/+4Fa7MVI104MfXkcUUU0GQgu+KdZALvtLJJ+BuNEgiOB/z3wPm3Mb1+daDk1HKdDskhNICR56UCt7FJJ/egR8OLUkdC8ydoMQfYgIZ+bWj7EgKCRAQKBgBefooXuIQQklYGP6t7IJ840HG/XALYrKXtKpCf13gaW8VKWb9pVW3ihc1gMl41WRqW3aWpvauAbhrU4gjqZMlfymT0Dfq4xIdM7vgIdOri8y45zflyv4ZKFJ97hmWODWrotXEs2vF2qrLK2FbCd0kHy6nAl4lc6x2zRyj6zYkypAoGASc6tZ4aDm3sUbkdiy6NXISfI2so9rh/0nJdvCx1F9PofaKyf59SfrxMPmGa61jJHuEksumPEx7kCfVEWJbdD6fL6ZX3evxyPKnBpB0IkAY5sqKn24ztyLm5H5ikzNGK7Q37Mpv/kchDIVgpowUZ0Ac+ccVBvHCXW60uz2cV27Uc=";
    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
    public static String alipay_public_key ="MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk9p1LQvnif7NmSqINXzZVvkELyisy2RcTc3EF9e8vHoyGwQyWroTtZXOBvVURZtp7GNIB6yGVzxORQOdnkUTB4E1VEVQEHHwkOEjuhX6pQ1eF1xu7T8ZXnToh9L3ZWoXX0BwTp2bB6d0dzTwDdtmYvqanBxnCYQzMmdnoqVt56govKBCouWasMkPdujdnp82HZlE72H0vnkV9UHtM7rMYmZAgF/ZbHg3Nivf+pLh+8yLY6vzORVsQcA01StixSbbH1PW6LbJfcCPQDM6cVuWp3ndd4apK5Ctub6vkQ0exqGQkLjyw/ZgxGaJvHZsyb6m4aDq+9GFHxDZOSfMAaTT/wIDAQAB";
    // 服务器异步通知页面路径  需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String notify_url = "http://工程公网访问地址/alipay.trade.page.pay-JAVA-UTF-8/notify_url.jsp";

	// 页面跳转同步通知页面路径 需http://格式的完整路径，不能加?id=123这类自定义参数，必须外网可以正常访问
	public static String return_url = "http://47.99.221.59/orders/myOrdersPay";

	// 签名方式
	public static String sign_type = "RSA2";
	
	// 字符编码格式
	public static String charset = "utf-8";
	
	// 支付宝网关
	public static String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
	
	// 支付宝网关
	public static String log_path = "C:\\";


//↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    /** 
     * 写日志，方便测试（看网站需求，也可以改成把记录存入数据库）
     * @param sWord 要写入日志里的文本内容
     */
    public static void logResult(String sWord) {
        FileWriter writer = null;
        try {
            writer = new FileWriter(log_path + "alipay_log_" + System.currentTimeMillis()+".txt");
            writer.write(sWord);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (writer != null) {
                try {
                    writer.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

