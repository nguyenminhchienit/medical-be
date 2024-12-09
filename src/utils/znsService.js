const axios = require("axios");
const crypto = require("crypto");

// Config thông tin ứng dụng từ Zalo
const APP_ID = "";
const APP_SECRET = "";
const TEMPLATE_ID = "";
const ZALO_API_URL = "https://business.openapi.zalo.me/message/template";

// Tạo chữ ký cho API Zalo
function createSignature(data) {
  const hmac = crypto.createHmac("sha256", APP_SECRET);
  hmac.update(JSON.stringify(data));
  return hmac.digest("hex");
}

// Gửi tin nhắn ZNS
async function sendZnsMessage(phone, data) {
  console.log({ phone, data });
  const requestData = {
    phone, // Số điện thoại người nhận
    template_id: TEMPLATE_ID, // Template ID
    template_data: data, // Dữ liệu template (như tên khách hàng, thông tin sản phẩm,...)
  };

  const signature = createSignature(requestData);

  try {
    const response = await axios.post(ZALO_API_URL, requestData, {
      headers: {
        "Content-Type": "application/json",
        access_token:
          "nA3tKVF1G2d0fl9TzC95BCId_bNpsqnHeVgKMD2UO5EcXvD3Y8LKCBY2Wa3jl71iYAgXVCYKTrVuhv1cjxzwGlYbZsdMnaDT-DwGSCdzPLYywwjXpiiPIF_Uxb_CxnqjX8Nr2zsbGYMCfF0zlS8KETZMm2sgnN8BnU6eEfNoJ0ZIcPGEX9vHBUIlXbhLoNvZWU6qMk22V4_GaTDjvfCwPB6nsbpaWX1BWv6bQk-IVMcMXBrC_u49Gu-mys7jY1XLXEpYMixX9MwfzjDavCmvUzFSxa6grYTaslR0LglfRrlhWuDVZ-PNRyxranwLtNWCy_kE6fxQOohMyhD7XFfxODZTjHIKm5aNrDkpCQ6uV03ztvSkakbW3FVajpcRmtWhyF383wlq412HmF43yDmd3RZsyoHKR0DIWa3pt4Oc",
        mac: signature,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error sending ZNS:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = { sendZnsMessage };
