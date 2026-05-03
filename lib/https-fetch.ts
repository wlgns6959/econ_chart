import https from "https";

/**
 * Node.js의 기본 fetch(undici)가 일부 IPv6 환경이나 한국 공공기관 API와 연결할 때
 * IPv6 블랙홀 이슈 등으로 UND_ERR_CONNECT_TIMEOUT 오류가 발생하는 문제를 해결하기 위해
 * 기본 https 모듈을 사용해 GET 요청을 보내는 함수입니다.
 */
export async function httpsGetJson(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive",
      },
    };

    https
      .get(options, (res) => {
        let data = "";

        if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
          return reject(
            new Error(`HTTP 요청 실패: 상태 코드 ${res.statusCode}`)
          );
        }

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch {
            reject(new Error("응답이 유효한 JSON 형식이 아닙니다."));
          }
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
