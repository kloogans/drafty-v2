import Head from "next/head"
import React from "react"
import Footer from "src/components/footer/Footer"
import PrimaryHeading from "src/components/headings/PrimaryHeading"
import Layout from "src/components/layout/Layout"

interface CookieData {
  name: string
  purpose: string
  provider: string
  service: string
  country: string
  type: string
  expires: string
}

interface CookieBoxProps {
  cookieData: CookieData
}

const CookieBox: React.FC<CookieBoxProps> = ({ cookieData }) => {
  return (
    <li className="p-4 border-2 border-indigo-300 rounded-2xl shadow-md">
      <ul className="flex flex-col gap-2 text-white text-sm">
        {Object.keys(cookieData).map((key) => {
          return (
            <li key={key}>
              <span className="font-bold">{key}:&nbsp;</span>
              {/* @ts-ignore */}
              <span>{cookieData[key]}</span>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

const CookiesPage = () => {
  return (
    <Layout className="min-h-screen w-full md:max-w-3xl !justify-start pt-32 child:text-left child:w-full">
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <PrimaryHeading className="!text-center !text-2xl font-bold">
        COOKIE POLICY
      </PrimaryHeading>
      <h2 className="text-sm text-white/70 mb-4 w-full !text-center">
        Last updated August 03, 2022
      </h2>

      <div className="w-full p-4 border-2 border-indigo-200 bg-indigo-900 rounded-2xl shadow-md mb-5">
        <p className="text-sm text-white mb-4">
          This Cookie Policy explains how Drafty ("Company", "we", "us", and
          "our") uses cookies and similar technologies to recognize you when you
          visit our websites at <strong>https://drafty.cc</strong>,
          ("Websites"). It explains what these technologies are and why we use
          them, as well as your rights to control our use of them.
          <br />
          <br />
          In some cases we may use cookies to collect personal information, or
          that becomes personal information if we combine it with other
          information.
        </p>

        <h3 className="w-full text-left text-lg font-bold text-white">
          What are cookies?
        </h3>
        <p className="text-sm text-white mb-4">
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners in order to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
          <br />
          <br />
          Cookies set by the website owner (in this case, Drafty) are called
          "first party cookies". Cookies set by parties other than the website
          owner are called "third party cookies". Third party cookies enable
          third party features or functionality to be provided on or through the
          website (e.g. like advertising, interactive content and analytics).
          The parties that set these third party cookies can recognize your
          computer both when it visits the website in question and also when it
          visits certain other websites.
        </p>

        <h3 className="w-full text-left text-lg font-bold text-white">
          Why do we use cookies?
        </h3>

        <p className="text-sm text-white mb-4">
          We use first and third party cookies for several reasons. Some cookies
          are required for technical reasons in order for our Websites to
          operate, and we refer to these as "essential" or "strictly necessary"
          cookies. Other cookies also enable us to track and target the
          interests of our users to enhance the experience on our Online
          Properties. Third parties serve cookies through our Websites for
          advertising, analytics and other purposes. This is described in more
          detail below.
          <br />
          <br />
          The specific types of first and third party cookies served through our
          Websites and the purposes they perform are described below (please
          note that the specific cookies served may vary depending on the
          specific Online Properties you visit):
        </p>

        <h3 className="w-full text-left text-lg font-bold text-white">
          How can I control cookies?
        </h3>

        <p className="text-sm text-white mb-4">
          You have the right to decide whether to accept or reject cookies. You
          can exercise your cookie rights by setting your preferences in the
          Cookie Consent Manager. The Cookie Consent Manager allows you to
          select which categories of cookies you accept or reject. Essential
          cookies cannot be rejected as they are strictly necessary to provide
          you with services.
          <br />
          <br />
          The Cookie Consent Manager can be found in the notification banner and
          on our website. If you choose to reject cookies, you may still use our
          website though your access to some functionality and areas of our
          website may be restricted. You may also set or amend your web browser
          controls to accept or refuse cookies. As the means by which you can
          refuse cookies through your web browser controls vary from
          browser-to-browser, you should visit your browser's help menu for more
          information.
          <br />
          <br />
          In addition, most advertising networks offer you a way to opt out of
          targeted advertising. If you would like to find out more information,
          please visit{" "}
          <a
            href="http://www.aboutads.info/choices/"
            className="font-bold hover:text-amber-400"
          >
            http://www.aboutads.info/choices/
          </a>{" "}
          or
          <a
            href="http://www.youronlinechoices.com"
            className="font-bold hover:text-amber-400"
          >
            http://www.youronlinechoices.com
          </a>
          .
          <br />
          <br />
          The specific types of first and third party cookies served through our
          Websites and the purposes they perform are described in the table
          below (please note that the specific cookies served may vary depending
          on the specific Online Properties you visit):
        </p>

        <h3 className="w-full text-left text-lg font-bold text-white">
          Essential website cookies:
        </h3>
        <p className="text-sm text-white mb-4">
          These cookies are strictly necessary to provide you with services
          available through our Websites and to use some of its features, such
          as access to secure areas.
        </p>

        <ul className="flex flex-col gap-2 mb-4">
          <CookieBox
            cookieData={{
              name: "__Host-next-auth.csrf-token",
              purpose: "To protect against CSRF attacks",
              provider: "drafty.cc",
              service: "Drafty",
              country: "United States",
              type: "http_cookie",
              expires: "When the browsing session ends"
            }}
          />

          <CookieBox
            cookieData={{
              name: "__Secure-next-auth.session-token",
              purpose: "Stores the session token for the next login attempt.",
              provider: "drafty.cc",
              service: "Drafty",
              country: "United States",
              type: "http_cookie",
              expires: "30 days"
            }}
          />

          <CookieBox
            cookieData={{
              name: "__Secure-next-auth.session-token",
              purpose: "Stores the session token for the next login attempt.",
              provider: "drafty.cc",
              service: "Drafty",
              country: "United States",
              type: "http_cookie",
              expires: "30 days"
            }}
          />
        </ul>

        <h3 className="w-full text-left text-lg font-bold text-white">
          What about other tracking technologies, like web beacons?
        </h3>
        <p className="text-sm text-white mb-4">
          Cookies are not the only way to recognize or track visitors to a
          website. We may use other, similar technologies from time to time,
          like web beacons (sometimes called "tracking pixels" or "clear gifs").
          These are tiny graphics files that contain a unique identifier that
          enable us to recognize when someone has visited our Websites or opened
          an e-mail including them. This allows us, for example, to monitor the
          traffic patterns of users from one page within a website to another,
          to deliver or communicate with cookies, to understand whether you have
          come to the website from an online advertisement displayed on a
          third-party website, to improve site performance, and to measure the
          success of e-mail marketing campaigns. In many instances, these
          technologies are reliant on cookies to function properly, and so
          declining cookies will impair their functioning.
        </p>

        <h3 className="w-full text-left text-lg font-bold text-white">
          Do you use Flash cookies or Local Shared Objects?
        </h3>
        <p className="text-sm text-white mb-4">No.</p>

        <h3 className="w-full text-left text-lg font-bold text-white">
          Do you serve targeted advertising?
        </h3>
        <p className="text-sm text-white mb-4">
          Third parties may serve cookies on your computer or mobile device to
          serve advertising through our Websites. These companies may use
          information about your visits to this and other websites in order to
          provide relevant advertisements about goods and services that you may
          be interested in. They may also employ technology that is used to
          measure the effectiveness of advertisements. This can be accomplished
          by them using cookies or web beacons to collect information about your
          visits to this and other sites in order to provide relevant
          advertisements about goods and services of potential interest to you.
          The information collected through this process does not enable us or
          them to identify your name, contact details or other details that
          directly identify you unless you choose to provide these.
        </p>

        <h3 className="w-full text-left text-lg font-bold text-white">
          How often will you update this Cookie Policy?
        </h3>

        <p className="text-sm text-white mb-4">
          We may update this Cookie Policy from time to time in order to
          reflect, for example, changes to the cookies we use or for other
          operational, legal or regulatory reasons. Please therefore re-visit
          this Cookie Policy regularly to stay informed about our use of cookies
          and related technologies.
          <br />
          <br />
          The date at the top of this Cookie Policy indicates when it was last
          updated.
        </p>

        <h3 className="w-full text-left text-lg font-bold text-white">
          Where can I get further information?
        </h3>

        <p className="text-sm text-white mb-4">
          If you have any questions about our use of cookies or other
          technologies, please email us at{" "}
          <a
            href="mailto:help@drafty.cc"
            className="font-bold hover:text-amber-400"
          >
            help@drafty.cc
          </a>
          .{" "}
        </p>
      </div>
      <Footer />
    </Layout>
  )
}

export default CookiesPage
