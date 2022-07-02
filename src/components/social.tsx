import { Icon } from "@iconify/react";

const Social = () => {
  const twitterShareUrl = `https://twitter.com/intent/tweet?${new URLSearchParams(
    {
      text: `Get a productivity boost 💻✨🧪, give this extension a try www.superkeys.app\n\nFollow @superkeys_app\n`,
      hashtags: "productivity,chrome,firefox,superkeys",
      ref_src: "superkeys-option-page",
    }
  ).toString()}`;

  return (
    <div className="flex items-center ml-2">
      <span>🎊 Tell others</span>
      <a
        id="twitter-link"
        className="mx-2 text-white bg-[#1DA1F2] flex px-2 py-1 rounded-2xl"
        href={twitterShareUrl}
        title="Share in twitter"
        rel="noreferrer"
        target="_blank"
      >
        <Icon icon="akar-icons:twitter-fill" className="text-xl" />
        Share
      </a>
      <a
        id="twitter-link"
        className="text-white bg-[#2DA1F2] flex px-2 py-1 rounded-2xl"
        href="https://twitter.com/superkeys_app"
        title="Follow Superkeys"
        rel="noreferrer"
        target="_blank"
      >
        <Icon icon="akar-icons:twitter-fill" className="text-xl" />
        Follow Superkeys
      </a>
    </div>
  );
};

export default Social;
