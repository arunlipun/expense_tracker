import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              Expense Tracker
            </h2>

            <p className="text-sm leading-6 text-gray-400">
              Manage your income, expenses, and savings
              in one place. Track your financial journey
              with ease and stay in control of your budget.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-white transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">
              Contact
            </h3>

            <div className="space-y-2 text-sm text-gray-400">
              <p>support@expensetracker.com</p>
              <p>Bhubaneswar, Odisha</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;