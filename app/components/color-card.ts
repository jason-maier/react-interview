import {
  Card,
  CardCallback,
  VotingCallback
} from "../../types/ember-colorpalette/card";
import { action } from "@ember-decorators/object";
import { attribute } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import hbs from "htmlbars-inline-precompile";
import Component from "@ember/component";

export default class ColorCard extends Component {
  // Computed properties
  // ---------------------------------------------------------------------------
  @computed("card.color")
  @attribute
  get style() {
    // Make the decision if this is a "light" or a "dark" color
    const color = "white";
    return `background-color: ${this.card.color}; color: ${color};`;
  }

  // Actions
  // ---------------------------------------------------------------------------
  @action
  editColor() {
    this.set("isEditing", !this.isEditing);
  }

  @action
  deleteCard() {
    console.log("card wants to delete");
    this.deleteCallback(this.card);
  }

  @action
  voteOnCard(value: number) {
    this.votingCallback(this.card, value);
  }

  // Passed properties
  // ---------------------------------------------------------------------------
  deleteCallback: CardCallback = () => undefined;
  votingCallback: VotingCallback = () => undefined;
  card: Card = null;

  // Internal properties
  // ---------------------------------------------------------------------------
  isEditing: boolean = false;

  // TODO: click on the text field to edit the text value directly
  // Template
  // ---------------------------------------------------------------------------
  layout = hbs`
    <section class="{{styleNamespace}}__main">
      <h1>name: {{card.name}}</h1>
      <section class="{{styleNamespace}}__colorField">
        <p>color: {{card.color}}</p>
        {{input value=card.color type="color"}}
      </section>
      <Stars @stars={{card.stars}} @votingCallback={{action "voteOnCard"}}/>
    </section>
    <section class="{{styleNamespace}}__actions">
      <UiButton @onClick={{action "deleteCard"}}>Delete</UiButton>
    </section>
  `;
}
