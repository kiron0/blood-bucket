import React from "react";
import app from "../../assets/app.png";
import { BiDonateBlood } from "react-icons/bi";
import useScrollToTop from "../../hooks/useScrollToTop";
import Swal from "sweetalert2";

const Footer = () => {
    useScrollToTop();

    const handleSubscribe = (e: any) => {
        e.preventDefault();
        const email = e.target.email.value;

        Swal.fire(
            "Thanks for subscribe us!!",
            `We received your email!. We will send you all the latest updates on ${email}`,
            "success"
        );
        e.target.reset();
    };

    return (
        <div
            className="pt-16 bg-base-100 shadow-xl"
            style={{ clipPath: `ellipse(130% 100% at 51.45% 100%)` }}
        >
            <footer className="footer px-10 py-10 bg-base-100 text-base-content container mx-auto">
                <div>
                    <BiDonateBlood className="text-3xl" />
                    <p>
                        <span className="text-2xl font-semibold">One Life Resources.</span>
                        <br />
                        All rights reserved.
                    </p>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="/"
                    >
                        <img src={app} alt="" className="mt-4" />
                    </a>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <a href="/" className="link link-hover">
                        Branding
                    </a>
                    <a href="/" className="link link-hover">
                        Design
                    </a>
                    <a href="/" className="link link-hover">
                        Marketing
                    </a>
                    <a href="/" className="link link-hover">
                        Advertisement
                    </a>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <a href="/" className="link link-hover">
                        About us
                    </a>
                    <a href="/" className="link link-hover">
                        Contact
                    </a>
                    <a href="/" className="link link-hover">
                        Jobs
                    </a>
                    <a href="/" className="link link-hover">
                        Press kit
                    </a>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a href="/" className="link link-hover">
                        Terms of use
                    </a>
                    <a href="/" className="link link-hover">
                        Privacy policy
                    </a>
                    <a href="/" className="link link-hover">
                        Cookie policy
                    </a>
                </div>
                <div>
                    <span className="footer-title">Newsletter</span>
                    <form onSubmit={handleSubscribe}>
                        <div className="form-control w-80">
                            <label className="label">
                                <span className="label-text">Enter your email address</span>
                            </label>
                            <div className="relative">
                                <input type="text" name="email" placeholder="username@site.com" className="input input-bordered w-full pr-16" required />
                                <button className="btn btn-error absolute top-0 right-0 rounded-l-none text-white">Subscribe</button>
                            </div>
                        </div>
                    </form>
                </div>
            </footer>
            <div className="text-center py-6">
                <p className="text-md font-semibold lg:text-sm">
                    Copyright &copy; 2022 - All rights reserved by One Life Resources.
                </p>
            </div>
        </div>
    );
};

export default Footer;
