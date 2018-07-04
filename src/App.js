import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import content from './content';
import Section from './Section';

const jQuery = $;

class App extends Component {
  constructor(props) {
    super(props)
    this.content = content;
  }
  componentDidMount() {
    (function($, win) {
      $.fn.inViewport = function(cb) {
        return this.each(function(i,el) {
          function visPx(){
            var elH = $(el).outerHeight(),
            H = $(win).height(),
            r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
            return cb.call(el, Math.max(0, t>0? Math.min(elH, H-t) : Math.min(b, H)));
          }
          visPx();
          $(win).on("resize scroll", visPx);
        });
      };
    } (jQuery, window));
    setTimeout(() => {
      $('.name').addClass('halfvisible');
      $('.blurb').addClass('halfvisible');
      setTimeout(() => {
        $('.name').removeClass('halfvisible');
        $('.blurb').removeClass('halfvisible');
        $('.name').addClass('visible');
        $('.blurb').addClass('visible');
      }, 900);
      setTimeout(() => {
        $('.card-wrapper').inViewport(function(px) {
          if (px) {
            setTimeout(() => {
              $(this).addClass('visible');
            }, 100);
          }
        })
      }, 1600);
    }, 100);
  }
  render() {
    return (
      <div className="App root-container">
        <div className="name">
          {this.content.name}
        </div>
        <div className="blurb">
          <div className="blurb-text">
            <p>
              <strong className="blurb-tagline">{this.content.tagline}</strong>
              <br />
            </p>
            <div className="line"></div>
            <p className="blurb-blurb">
              {this.content.blurb}
            </p>
          </div>
        </div>
        <div className="spacer"></div>
        {this.content.sections
          .sort((a, b) => a.order-b.order)
          .map(section => <Section {...section} />)}
      </div>
    );
  }
}

export default App;
