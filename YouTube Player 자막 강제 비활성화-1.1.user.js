// ==UserScript==
// @name         YouTube Player 자막 강제 비활성화
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  YT.Player 생성 시 자막 옵션 강제 비활성화
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // YT 객체가 로드될 때까지 기다림
  function waitForYT(callback) {
    const interval = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(interval);
        callback();
      }
    }, 200);
  }

  waitForYT(() => {
    const OriginalPlayer = YT.Player;

    YT.Player = function(id, options) {
      if (options && options.playerVars) {
        options.playerVars.cc_load_policy = 0;
        options.playerVars.rel = 0;
        options.playerVars.modestbranding = 1;
      } else if (options) {
        options.playerVars = {
          cc_load_policy: 0,
          rel: 0,
          modestbranding: 1
        };
      }

      return new OriginalPlayer(id, options);
    };
  });
})();