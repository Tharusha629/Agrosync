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
                  Harvesting Tomorrow's harvests today
                </p>
              </div>
              <div className="section_two_home"></div>
              <div className="section_thre_home">
                <p className="section_thre_home_pera">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo
                </p>
              </div>
            </div>
            <div className="sub_content_con">
              <div className="sub_content_card">
                <div className="sub_content_card_colum_img"></div>
                <div className="sub_content_card_colum">
                  <p className="sub_content_card_colum_topic">Agrosync</p>
                  <p className="sub_content_card_colum_pera">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="why_chooseus">
          <div className="page_with_set">
            <div className="why_chooseus_card">
              <div className="why_chooseus_card_colum">
                <p className="why_chooseus_card_topic">Whay choose</p>
                <p className="why_chooseus_card_topic">
                  Agrosync <span className="dot">.</span>
                </p>
              </div>
              <div className="why_colum_num_full">
                <div className="why_colum_num_card">
                  <p className="why_colum_num_card_number">75+</p>
                  <p className="why_colum_num_card_pera">Regula Customers</p>
                </div>
                <div className="why_colum_num_card">
                  <p className="why_colum_num_card_number">75+</p>
                  <p className="why_colum_num_card_pera">
                    Points of Sale Goods
                  </p>
                </div>
                <div className="why_colum_num_card">
                  <p className="why_colum_num_card_number">30+</p>
                  <p className="why_colum_num_card_pera">Awards Won</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="page_with_set">
          <div className="why_chooseus_card_colum">
            <p className="why_chooseus_card_topic">our latest projects and</p>
            <p className="why_chooseus_card_topic">
            research <span className="dot">.</span>
            </p>
          </div>
          <div className="last_cardset">
            <div className="last_card last_card_one">
              <p className="last_card_topic">Natural vegetables</p>
              <p className="last_card_pera">vegitable organic</p>
            </div>
            <div className="last_card last_card_two">
              <p className="last_card_topic">Food Health Check</p>
              <p className="last_card_pera">food medical</p>
            </div>
            <div className="last_card last_card_three">
              <p className="last_card_topic">Organic Vegetable</p>
              <p className="last_card_pera">vegitable organic</p>
            </div>
          </div>
        </div>
        <div className="footer">
          <p className="footer_pera">© 2022 Agrosync. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
