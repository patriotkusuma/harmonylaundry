'use client';
import { useEffect } from 'react';

const ChatwootWidget = () => {
  useEffect(() => {
    // 1. Definisikan settings TERLEBIH DAHULU
    window.chatwootSettings = {
      position: 'right', // default di kanan
      type: 'expanded_bubble',
      launcherTitle: 'Chat Admin',
    };

    // Jika mobile, pindah ke kiri
    if (window.innerWidth < 768) {
      window.chatwootSettings.position = 'left';
    }

    // 2. Load script
    (function(d,t) {
      var BASE_URL="https://chatwoot.harmonylaundry.my.id";
      var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=BASE_URL+"/packs/js/sdk.js";
      g.async = true;
      s.parentNode.insertBefore(g,s);
      g.onload=function(){
        window.chatwootSDK.run({
          websiteToken: 'upKttAPmFix2AKSRKM2C1Exu',
          baseUrl: BASE_URL
        });
      }
    })(document,"script");
  }, []);

  return null;
};

export default ChatwootWidget;
