import React from "react";
import "./Home.css";
import NavBar from "./NavBar";

function Home() {
  return (
    <div>
      <NavBar />
      <div className="main_continer">
        <div className="home_section_back">
          <div className="rounnd_add"></div>
          <div className="page_with_set">
            <div className="home_section">
              <div className="section_one_home">
                <p className="section_one_home_topic">
                  Cultivating a Better Tomorrow, One Harvest at a Time
                </p>
              </div>
              <div className="section_two_home"></div>
              <div className="section_thre_home">
                <p className="section_thre_home_pera">
                  At AgroSync, we believe in sustainable farming and empowering local farmers. Our platform connects communities, promotes innovation, and helps you grow smarter. Join us in nurturing the future—harvest by harvest.
                </p>
              </div>
            </div>

            <div className="sub_content_con">
              <div className="sub_content_card">
                <div className="sub_content_card_colum_img"></div>
                <div className="sub_content_card_colum">
                  <p className="sub_content_card_colum_topic">AgroSync</p>
                  <p className="sub_content_card_colum_pera">
                    AgroSync is your trusted companion in modern agriculture. We provide tools, insights, and a community-driven platform designed to support farmers at every step of their journey—from planting to selling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="why_chooseus">
          <div className="page_with_set">
            <div className="why_chooseus_card">
              <div className="why_chooseus_card_colum">
                <p className="why_chooseus_card_topic">Why Choose</p>
                <p className="why_chooseus_card_topic">
                  AgroSync <span className="dot">.</span>
                </p>
              </div>
              <div className="why_colum_num_full">
                <div className="why_colum_num_card">
                  <p className="why_colum_num_card_number">75+</p>
                  <p className="why_colum_num_card_pera">Regular Customers</p>
                </div>
                <div className="why_colum_num_card">
                  <p className="why_colum_num_card_number">75+</p>
                  <p className="why_colum_num_card_pera">Product Sale Points</p>
                </div>
                <div className="why_colum_num_card">
                  <p className="why_colum_num_card_number">30+</p>
                  <p className="why_colum_num_card_pera">Awards Won</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Projects and Research Section */}
        <div className="page_with_set">
          <div className="why_chooseus_card_colum">
            <p className="why_chooseus_card_topic">Our Latest Projects and</p>
            <p className="why_chooseus_card_topic">
              Research <span className="dot">.</span>
            </p>
          </div>
          <div className="last_cardset">
            <div className="last_card last_card_one">
              <p className="last_card_topic">Natural Vegetables</p>
              <p className="last_card_pera">Fresh and organic produce</p>
            </div>
            <div className="last_card last_card_two">
              <p className="last_card_topic">Food Health Check</p>
              <p className="last_card_pera">Nutritional food analysis</p>
            </div>
            <div className="last_card last_card_three">
              <p className="last_card_topic">Organic Farming</p>
              <p className="last_card_pera">Eco-friendly crop methods</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p className="footer_pera">© 2025 AgroSync. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
