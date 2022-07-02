import { Icon } from '@iconify/react'
import Social from '../components/social'
import Review from '../components/review'
import { SuperkeysTextLogo } from '../components/superkeys-text-logo'

const Footer = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full">
            <footer className="footer items-center p-1 bg-neutral text-neutral-content">
                <div className="items-center grid-flow-col">
                    <a
                        className="btn btn-ghost"
                        href="https://www.superkeys.app/"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <SuperkeysTextLogo width={100} />
                    </a>
                    <Review />
                </div>
                <Social />
                <div className="grid-flow-col gap-2 md:place-self-center md:justify-self-end mr-4">
                    <span>Made with ❤️ by</span>
                    <a
                        href="https://twitter.com/nil_ooy"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Icon
                            icon="akar-icons:twitter-fill"
                            className="text-xl text-[#1DA1F2]"
                        />
                    </a>
                    <a
                        href="https://github.com/nilooy"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Icon
                            icon="akar-icons:github-fill"
                            className="text-lg"
                        />
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default Footer
