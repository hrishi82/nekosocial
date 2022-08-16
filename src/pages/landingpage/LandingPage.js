
import "./landingpage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const LandingPage = () => {
  const { token } = useSelector(store=>store.auth)
  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    if (e.target.innerText === "Home") {
      navigate("/homepage");
    } else {
      navigate("/loginpage");
    }
  };

  return (
    <div className="landingpg-container">
      <header className="hero-container">
        <section className="hero-content-section">
          <h1 className="hero-heading text-xl">nekoSocial</h1>
          <p className="hero-para">
            {token
              ? "Click on HOME to check out your saved notes"
              : "Login to start"}
          </p>

          <div className="hero-btn-container">
            <button
              className="btn btn-primary hero-btn"
              onClick={(e) => logoutHandler(e)}
            >
              {token ? "Home" : "Login"}
            </button>
            <div className="secondary-hero-btn-container">
              {!token && (
                <Link to="/signuppage" className="btn secondary-hero-btn">
                  Dont have an account? Sign up!
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="hero-img-container">
          <img
            src="https://res.cloudinary.com/dac2rwutk/image/upload/v1650267376/notelandingpg_hkwgic.svg"
            alt="hero image"
            className="img-responsive"
          />
        </section>
      </header>
    </div>
  );
};
