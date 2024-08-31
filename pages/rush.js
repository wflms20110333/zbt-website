import React from "react";
import { Link } from "react-router";
import DocumentTitle from "react-document-title";
import SkyLight from "react-skylight";
import { config } from "config";

import { Row, Splash, ImgGallery } from "./_sharedComponents";

import { prefixLink } from "../utils/urls.js";
import CoverImg from "../static/rush-cover.jpg";

import RushImg1 from "../static/rush-photo-1.jpg";
import RushImg2 from "../static/rush-photo-2.jpg";
import RushImg3 from "../static/rush-photo-3.jpg";
import RushImg4 from "../static/rush-photo-4.jpg";
import RushImg5 from "../static/rush-photo-5.jpg";
import RushImg6 from "../static/rush-photo-6.jpg";

const rushPhotos = [
  RushImg1,
  RushImg2,
  RushImg3,
  RushImg4,
  RushImg5,
  RushImg6,
].map((url) => ({ src: prefixLink(url) }));

export default function ({}) {
  return (
    <DocumentTitle title={"Rush ZBT | " + config.siteTitle}>
      <div>
        <Splash id="rush" imageUrl={CoverImg}></Splash>
        <div className="contents typography">
          <h1>Rush ZBT this fall! (2024)</h1>
          <WithBoringTextOnSide>
            <Schedule />
          </WithBoringTextOnSide>
          <ImgGallery images={rushPhotos} useLightbox />
        </div>
        <div className="contents typography">
          <h2></h2>
        </div>
      </div>
    </DocumentTitle>
  );
}

// this was in the flex-cell div: <p className="important">Call ZBT for rides at <a href="tel:6172323257">617-404-9663</a> to get to any Rush event.</p>
function WithBoringTextOnSide({ children }) {
  return (
    <div className="flex rush">
      <div className="flex-cell">* invite only</div>
      <div className="flex-cell-bigger schedule">{children}</div>
    </div>
  );
}

function Schedule() {
  let openDeetsFn = () => {};
  let _details;

  const events = parseText();
  const byDay = {};
  events.forEach((x) => {
    byDay[x.day] = byDay[x.day] ? [...byDay[x.day], x] : [x];
  });

  const days = [];
  Object.keys(byDay).forEach((key) => {
    days.push({ date: new Date(key.split(", ")[1] + " 2023"), key });
  });

  days.sort((a, b) => -a.date + b.date);
  const tableRows = [];
  days.forEach(({ key }) => {
    tableRows.push(
      <tr key={key}>
        <th></th>
        <th>{key}</th>
      </tr>
    );
    byDay[key].forEach((x, i) => {
      const deets = (e) => {
        _details.setState(x);
        openDeetsFn();
        e.preventDefault();
      };
      tableRows.push(
        <tr key={key + i}>
          <td className="time">{x["time"]}</td>
          <td>
            {x["title"]}{" "}
            <a href="#" onClick={deets}>
              details
            </a>
          </td>
        </tr>
      );
    });
  });

  return (
    <div className="schedule">
      <DetailsPane
        ref={(ref) => (_details = ref)}
        cb={(f) => (openDeetsFn = f)}
      />
      <table>
        <tbody>{tableRows}</tbody>
      </table>
      {/*<div className="note">Events marked with asterisk(*) are invite-only</div>*/}
    </div>
  );
}

class DetailsPane extends React.Component {
  constructor() {
    super();
    this.state = { title: "", day: "", time: "", desc: "" };
  }

  render() {
    this.props.cb(() => this.refs.deetsPopup.show());
    return (
      <SkyLight hideOnOverlayClicked ref="deetsPopup" title={this.state.title}>
        <h3>
          Time: {this.state.time} - {this.state.day}
        </h3>
        <h3>Location: {this.state.location}</h3>
        <p>{this.state.desc}</p>
      </SkyLight>
    );
  }
}

function parseText() {
  return text.split("\n\n").map((paragraph) => {
    const lines = paragraph.split("\n");
    return {
      title: lines[0].split(": ").slice(1).join(": "),
      time: lines[1].split(", ").slice(2).join(", "),
      day: lines[1]
        .split(", ")
        .slice(0, 2)
        .join(", ")
        .split(": ")
        .slice(1)
        .join(": "),
      location: lines[2].split(": ").slice(1).join(": "),
      desc: lines[4],
    };
  });
}

const text = `Title: Canes and Outdoor Games
Time: Saturday, August 31, 1:00pm - 4:00pm
Location: Briggs Field
Description:
Come to Briggs Field for Cane's chicken and have a ball playing of spikeball, soccer, ultimate, football, and more! Vegetarian options available.

Title: Sushi and Poker
Time: Saturday, August 31, 5:00pm - 8:00pm
Location: Walker Memorial
Description:
Sushi Dinner! Come meet the brothers of ZBT and stay for our poker tournament where we'll give out over $1000 in prizes, including airpods, a nintendo switch, and gift cards! All skill levels welcome; we'll teach you how to play.

Title: Paintball
Time: Sunday, September 1, 10:15am - 4:00pm
Location: Action Games Paintball
Description:
Come play paintball with the brothers of ZBT! Meet outside Maseeh or call us at (857) 327-8936 for your ride!

Title: Thai Food and House Tours
Time: Sunday, September 1, 5:00pm - 7:30pm
Location: ZBT House
Description: 
Meet the brothers, tour the ZBT house, and enjoy some of Boston's best thai food. Meet outside Maseeh or text (857) 327-8936 for your ride!

Title: Minigolf
Time: Sunday, September 1, 7:30pm - 10:00pm
Location: McGolf
Description: 
Come play minigolf with the brothers of ZBT. For rides, call us at (857) 327-8936!

Title: Go Karting
Time: Monday, September 2, 1:00pm - 5:00pm
Location: K1 Speed
Description:
Join the brothers of ZBT for our rendition of Fast and Furious! Call (857) 327-8936 for a ride!

Title: Bowling and Arcade
Time: Monday, September 2, 5:15pm - 8:45pm
Location: Kings Dining & Entertainment
Description:
Have some spare time? Come bowl with the brothers of ZBT! Whether you strike it lucky or end up in the gutter, it’ll be a great time! Need a ride? Call us at (857) 327-8936!

Title: Late Night IHOP
Time: Monday, September 2, 8:45pm - 11:00am
Location: IHOP
Description:
Up late? Hungry from bowling? Join ZBT in eating America’s best pancakes at a late-night run to IHOP. We will be providing transportation from campus to IHOP and from bowling directly to IHOP as well. Call (857) 327-8936 for a ride.

Title: Battle Canoes
Time: Tuesday, September 3, 2:00pm - 5:15pm
Location: Meet at Kresge Turnaround
Description:
This is SPARTA!! Actually, it’s just the Charles river. Wanna get soaked in the river just for the fun of it? Wanna throw some water balloons at people because why not? Come to ZBT Battle Canoeing! We will be renting boats to go on the Charles. Life jackets will be available and your electronics will be taken care of.

Title: Mediteranean Dinner*
Time: Tuesday, September 3, 5:15pm - 7:30pm
Location: ZBT House
Description:
Mediteranean dinner with the brothers of ZBT!

Title: Level 99*
Time: Tuesday, September 3, 8:00pm - 10:00pm
Location: Level99
Description:
A night of mental puzzles, physical challenges, and crushing your friends in competitions!

Title: Rock Climbing*
Time: Wednesday, September 4, 5:00pm - 7:30pm
Location: Central Rock Gym
Description:
Come boulder with the brothers of ZBT. Call (857) 327-8936 for rides.

Title: Fried Chicken Dinner*
Time: Wednesday, September 4, 7:30pm - 10:00pm
Location: ZBT House
Description:
Come join ZBT for some delicious bonchon chicken and good times. Vegetarian options available! Call us at (857) 327-8936 for rides.

Title: Sunset Boat Cruise*
Time: Thursday, September 5, 5:00pm - 9:00pm
Location: Odyssey Boston
Description:
Enjoy a sunset boat cruise over the Charles River! Food will be provided.
`;
