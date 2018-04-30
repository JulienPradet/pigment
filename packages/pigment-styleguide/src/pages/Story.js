import React from "react";
import layout from "./_layout";
import Features from "../modules/Features";
import StoriesContext from "../StoriesContext";

const StoryRoute = ({ params }) => {
  return (
    <StoriesContext.Consumer>
      {stories => {
        const story = stories.get(params.story);

        const dependsOn = [];
        for (let dependency of story.dependsOn.values()) {
          dependsOn.push(dependency);
        }

        const reliesOn = [];
        for (let dependency of story.reliesOn.values()) {
          reliesOn.push(dependency);
        }

        return (
          <div>
            <h1>{story.name}</h1>
            {dependsOn.length > 0 && (
              <section>
                <h2>Depends on</h2>
                <ul>
                  {dependsOn.map(story => <li key={story.id}>{story.name}</li>)}
                </ul>
              </section>
            )}
            {reliesOn.length > 0 && (
              <section>
                <h2>Relies on</h2>
                <ul>
                  {reliesOn.map(story => <li key={story.id}>{story.name}</li>)}
                </ul>
              </section>
            )}

            <Features story={story} />
          </div>
        );
      }}
    </StoriesContext.Consumer>
  );
};

StoryRoute.layout = layout;

export default StoryRoute;
