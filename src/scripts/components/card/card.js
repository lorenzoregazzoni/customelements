import { Decorator, Utils } from "../../core";
import cardCss from 'bundle-text:./card.css';

export class Card extends HTMLElement {
  static extendsElement = "article";

  static attributes = {
  };

  static events = {
  };

  static {
    Decorator.componentDecorator(this);
    Utils.registerStylesheet(cardCss);
  }

  constructor() {
    super();

    const img = this.querySelector('img');
    if (img) {
      const figure = document.createElement('figure');
      img.insertAdjacentElement("beforebegin", figure);
      figure.insertAdjacentElement("afterbegin", img);
    }

    const h2 = this.querySelector('h2');
    if (h2) {
      const hgroup = document.createElement('hgroup');
      h2.insertAdjacentElement("beforebegin", hgroup);
      hgroup.insertAdjacentElement("afterbegin", h2);
    }

    const section = document.createElement('section');
    const refElement = this.querySelector('hgroup') ?? this.querySelector('figure') ?? this;
    const refPosition = refElement === this ? "afterbegin" : "afterend";
    refElement.insertAdjacentElement(refPosition, section);
    const siblings = document.createDocumentFragment();
    let sibling = section.nextSibling;
    while (sibling) {
      siblings.append(sibling);
      sibling = section.nextSibling;
    }
    section.append(siblings);

  }
}

// <article is="mt-card">
//   Contenuto della Card
// </article>

/*
<article is="mt-card">
  <img src="https://placecats.com/300/200" alt="" />
  <h2>Titolo della card 4</h2>
  Contenuto della Card 4
  <button size="lg">Button Example</button>
</article>
*/

/*
<article is="mt-card">
  <figure>
    <img src="https://placecats.com/300/200" alt="" />
  </figure>
  <hgroup>
    <h2>Titolo della card 4</h2>
  </hgroup>
  <section>
    Contenuto della Card 4
    <button size="lg">Button Example</button>
  </section>
</article>
*/