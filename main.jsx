import React from 'react';
import { createRoot } from 'react-dom/client';
import copy from '../assets/text-content.md?raw';
import logo from '../assets/logo.svg';
import portrait from '../assets/profile_picture.jpg';
import facebook from '../assets/facebook-icon.png';
import instagram from '../assets/instagram-icon.svg';
import twitter from '../assets/twitter-icon.svg';
import featured from '../assets/all-encores.jpg';
import articulation from '../assets/articulation.jpg';
import blurred from '../assets/blurred.jpg';
import encores from '../assets/encores-2.jpg';
import eulogy from '../assets/eulogy-for-evolution.jpg';
import './style.css';

const [article, authorAndCopyright, commentText] = copy.trim().split(/^## (?:The Author|Comments)\s*$/m);
const [opening, ...sections] = article.trim().split(/^## /m);
const [title, introduction] = opening.trim().split(/\n\s*\n/);
const [name, subtitle] = title.replace(/^# /, '').split(': ');
const [bio, copyright] = authorAndCopyright.trim().split(/\n\s*\n/);
const comments = [...commentText.matchAll(/^\*\*(.+?)\*\*[^\S\n]*\n([^\n]+)/gm)];

function Navigation() {
  return (
    <nav aria-label="Site navigation">
      <a href="#blog">Our Blog</a>
      <a href="#albums">Our Artists</a>
      <a href="#author">Our Story</a>
    </nav>
  );
}

function SocialIcons() {
  return (
    <ul className="socials" aria-label="Social media">
      {[[facebook, 'Facebook'], [instagram, 'Instagram'], [twitter, 'Twitter']].map(([image, label]) => (
        <li key={label}><img src={image} alt={label} /></li>
      ))}
    </ul>
  );
}

function AlbumGallery() {
  const covers = [
    [featured, 'All Encores'], [articulation, 'Articulation'],
    [blurred, 'Blurred'], [encores, 'Encores 2'],
    [eulogy, 'Eulogy for Evolution'],
  ];

  return (
    <div className="albums" id="albums" role="group" aria-label="Album covers">
      {covers.map(([image, title]) => <img key={title} src={image} alt={title + ' album cover'} />)}
    </div>
  );
}

function BlogArticle() {
  return (
    <article id="blog">
      <div className="article-copy">
        <h1>{name}: <span>{subtitle}</span></h1>
        <p className="intro">{introduction}</p>
        <div className="columns">
          {sections.map((section, index) => {
            const [heading, ...body] = section.trim().split('\n');
            return (
              <section key={index}>
                <h2>{heading}</h2>
                {body.join('\n').trim().split(/\n\s*\n/).map((paragraph) => (
                  <p key={paragraph}>{paragraph.trim()}</p>
                ))}
              </section>
            );
          })}
        </div>
      </div>
      <AlbumGallery />
      <section className="author" id="author">
        <div>
          <h2>The Author</h2>
          <p>{bio}</p>
        </div>
        <img className="portrait" src={portrait} alt="Author portrait" />
        <SocialIcons />
      </section>
    </article>
  );
}

function Comments() {
  return (
    <section className="comments">
      <h2>Comments</h2>
      {comments.map(([, username, message]) => (
        <div className="comment" key={username}>
          <p><strong>{username}</strong></p>
          <p>{message}</p>
        </div>
      ))}
    </section>
  );
}

function App() {
  return (
    <>
      <header className="site-header">
        <img className="logo" src={logo} alt="Erased Tapes Records" />
        <Navigation />
      </header>
      <main>
        <BlogArticle />
        <Comments />
      </main>
      <footer>
        <Navigation />
        <p>{copyright}</p>
        <SocialIcons />
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
