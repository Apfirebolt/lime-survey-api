import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 text-gray-600 dark:text-gray-300">
      <div className="mx-auto w-full max-w-screen-xl p-6 lg:p-8">
        
        {/* Top Section: Brand Overview & Call to Action */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
          
          {/* Brand & Tagline Column (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                📊
              </span>
              <span>Lime Survey</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              The community-driven platform for creating surveys, gathering authentic opinions, and earning insights from people around the globe.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-5 flex items-center space-x-3">
              <Link
                to="/create-survey"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg shadow-xs hover:bg-emerald-700 transition-colors dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                + Create a Survey
              </Link>
              <Link
                to="/surveys"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Take Surveys
              </Link>
            </div>
          </div>

          {/* Column 1: Explore & Take Surveys */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Explore Surveys
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/surveys?category=trending" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Trending Surveys
                </Link>
              </li>
              <li>
                <Link to="/surveys?category=technology" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Tech & Gadgets
                </Link>
              </li>
              <li>
                <Link to="/surveys?category=education" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Education & Science
                </Link>
              </li>
              <li>
                <Link to="/surveys?category=lifestyle" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Lifestyle & Health
                </Link>
              </li>
              <li>
                <Link to="/surveys?category=business" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Business & Market
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform Resources */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Resources
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Top Contributors
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Developer API
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Trust & Legal
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/survey-guidelines" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Content Guidelines
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Middle Section: Platform Metrics Bar */}
        <div className="py-4 my-4 bg-emerald-50 dark:bg-gray-800/50 rounded-2xl px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="block text-xl font-bold text-gray-900 dark:text-white">10K+</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Active Surveys</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-gray-900 dark:text-white">500K+</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Responses Collected</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-gray-900 dark:text-white">50K+</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Community Members</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-emerald-600 dark:text-emerald-400">100%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Anonymous & Secure</span>
          </div>
        </div>

        {/* Bottom Section: Copyright & Social Links */}
        <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>© {currentYear} Lime Survey. Built for open community feedback.</p>

          <div className="flex space-x-5 mt-4 sm:mt-0">
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
            </a>
            <a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;