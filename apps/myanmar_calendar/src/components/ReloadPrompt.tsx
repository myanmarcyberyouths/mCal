import React from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { pwaInfo } from "virtual:pwa-info";
import { toast } from "sonner";

// eslint-disable-next-line no-console
console.log(pwaInfo);

function ReloadPrompt() {
  // replaced dynamically
  const buildDate = "__DATE__";
  // replaced dyanmicaly
  const reloadSW = "__RELOAD_SW__";

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      // eslint-disable-next-line no-console
      console.log(`Service Worker at: ${swUrl}`);
      // @ts-expect-error just ignore
      if (reloadSW === "true") {
        r &&
          setInterval(() => {
            // eslint-disable-next-line no-console
            console.log("Checking for sw update");
            r.update();
          }, 20000 /* 20s for testing purposes */);
      } else {
        // eslint-disable-next-line prefer-template,no-console
        console.log("SW Registered: " + r);
      }
    },
    onRegisterError(error) {
      // eslint-disable-next-line no-console
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="ReloadPrompt-container">
      {(offlineReady || needRefresh) &&
        toast(
          offlineReady
            ? "App is ready to work offline."
            : `New version ${buildDate} is available.`,
          {
            action: {
              label: "Reload",
              onClick: async () => {
                await updateServiceWorker(true);
              },
            },
            cancel: {
              label: "Dismiss",
              onClick: () => close(),
            },
          },
        )}
    </div>
  );
}

export default ReloadPrompt;
