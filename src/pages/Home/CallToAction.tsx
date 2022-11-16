import { BsEnvelopeOpen, BsTelephoneOutbound } from "react-icons/bs";
import { RiFeedbackLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import swal from "sweetalert";
type Props = {};
const Fade = require("react-reveal/Fade");
const CallToAction = (props: Props) => {
  return (
    <div>
      <div className="container mx-auto px-10 md:px-20 z-10 relative">
        <Fade top distance="20px">
          <div className="call-to-action-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="call-to-action-card shadow-lg bg-base-100 p-10 text-center rounded-lg flex-1">
              <div className="call-to-action-card__icon text-4xl grid justify-center py-4 ">
                <BsTelephoneOutbound />
              </div>
              <div className="call-to-action-card__content">
                <h3 className="call-to-action-card__title">Call Us</h3>
                <p className="call-to-action-card__text text-success mt-3">
                  +1 234 567 8900
                </p>
              </div>
            </div>
            <div className="call-to-action-card shadow-lg bg-base-100 p-10 text-center rounded-lg  flex-1">
              <div className="call-to-action-card__icon text-4xl grid justify-center py-4 ">
                <BsEnvelopeOpen />
              </div>
              <div className="call-to-action-card__content">
                <h3 className="call-to-action-card__title">
                  Get Contact Support
                </h3>
                <Link
                  to="/contact-us"
                  className="btn btn-success btn-lg capitalize text-sm mt-4 text-white"
                >
                  Contact Support
                </Link>
              </div>
            </div>
            <div className="call-to-action-card shadow-lg bg-base-100 p-10 text-center rounded-lg flex-1">
              <div className="call-to-action-card__icon text-4xl grid justify-center py-4 ">
                <RiFeedbackLine />
              </div>
              <div className="call-to-action-card__content">
                <h3 className="call-to-action-card__title">Leave a Feedback</h3>
                <span
                  onClick={() => {
                    swal({
                      title: "Leave a Feedback",
                      text: "Please leave your feedback",
                      content: {
                        element: "input",
                        attributes: {
                          placeholder: "Type your feedback here...",
                          type: "text",
                        },
                      },
                    }).then((value) => {
                      swal(`You typed: ${value}`);
                    });
                  }}
                  className="btn btn-success btn-lg capitalize text-sm mt-4 text-white"
                >
                  Send Feedback
                </span>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default CallToAction;
