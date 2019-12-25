import React from "react";
import "./RemarkPerson.scss";
import config from "../../config";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Row, Col, Tabs, Icon, Rate, Card, Divider, Button } from "antd";

const Person = ({ text, selected }) => {
  return (
    <Card
      className={`menu-item ${selected ? "active" : ""}`}
      title={<Rate disabled defaultValue={4} />}
      className="remark-person-card"
      bordered={false}
    >
      Card content
    </Card>
  );
};

const RemarkPersons = (list, selected) => {
  list.map(person => {
    return <Person text={person} key={person} selected={selected} />;
  });
};

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class RemarkPerson extends React.Component {
  constructor(props) {
      super(props)
      this.state={
          persons:[1,2,3],
          selected:1
      }
  }
  render() {
      const menu=RemarkPersons(this.state.persons,this.state.selected)
    return (
      <div>
        <Row className="remark-person-container">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          selected={this.state.selected}
          onSelect={this.onSelect}
        />
        asdsd
        </Row>
      </div>
    );
  }
  onSelect = key => {
    this.setState({ selected: key });
  }
}

export default RemarkPerson;
