import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import github from "../img/github-icon.svg";
import logo from "../img/cip.png";

const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: "",
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            });
      }
    );
  };

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <div>
              <Link to="/" className="navbar-item" title="Logo">
                <img src={logo} alt="CIP" style={{ maxHeight: 70 }} />
                <div className="ml-2">
                  <p className="has-text-weight-bold">Energy Talking Points</p>
                  <p>by Alex Epstein</p>
                </div>
              </Link>
            </div>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-end has-text-centered">
              {posts &&
                posts.map(({ node: post }) => (
                  <Link
                    key={post.fields.slug}
                    className="navbar-item"
                    to={`/${post.fields.slug}`}
                  >
                    {post.frontmatter.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default () => (
  <StaticQuery
    query={graphql`
      query NavBarQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Navbar data={data} count={count} />}
  />
);
