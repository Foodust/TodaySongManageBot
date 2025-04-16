// 필요한 Discord.js 클래스 및 설정
global.ReadableStream = require("stream/web").ReadableStream;
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { token } = require("./config.json");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel],
});

// 설정 - 아래 값들을 직접 입력해야 합니다
const TOKEN = token;
const TARGET_CHANNEL_ID = "1361872060481147122"; // 모니터링할 채널의 ID

// 봇 준비 완료
client.once("ready", () => {
  console.log(`${client.user.tag}으로 로그인했습니다!`);
});

// 메시지 핸들러
client.on("messageCreate", async (message) => {
  // 메시지가 대상 채널에 있는지 확인
  if (message.channelId === TARGET_CHANNEL_ID) {
    try {
      // O와 X 반응 추가
      await message.react("⭕"); // O 반응
      await message.react("❌"); // X 반응

      console.log(`메시지에 반응 추가: ${message.content.substring(0, 20)}...`);
    } catch (error) {
      console.error("반응 추가 중 오류:", error);
    }
  }
});

// Discord에 봇 토큰으로 로그인
client.login(TOKEN);
