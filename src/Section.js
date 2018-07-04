import React, { Component } from 'react';

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingMore: false
    }
  }
  showMore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showingMore: true
    });
  }
  render() {
    return (
      <div className="card-wrapper">
        <div className={'card ' + this.props.color}>
          <div className="card-back"></div>
          <div className="card-title">
            {this.props.title}
          </div>
          <div className="card-blurb">
            <p>
              {this.props.description}
            </p>
          </div>
          <div className="card-content">
            {this.props.items.map((item, i) =>
              <div className={'card-row ' + (!this.state.showingMore && i >= this.props.showFirstItems ? 'hidden' : '')}>
                <div className="card-column"><a href={item.link}>{item.title}</a></div>
                <div className="card-column">{item.description}</div>
              </div>
            )}
            <div style={{transition: 'opacity 0.4s', opacity: this.state.showingMore ? 0 : 1}} className="card-footer">
              <div className="line"></div>
              <p><a href="" onClick={this.showMore}>See more</a></p>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Section;
