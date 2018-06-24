import React from "react";
import Link from "../ui/Link";
import Card from "../ui/Card";
import CardContainer from "../ui/Card/CardContainer";
import { H1, H2 } from "../ui/Typography/Heading";
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
          <CardContainer>
            <Card title={<H1>{story.name}</H1>}>
              {dependsOn.length > 0 && (
                <>
                  <H2>Depends on</H2>
                  <ul>
                    {dependsOn.map(story => (
                      <li key={story.id}>
                        <Link to={story.path}>{story.name}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {reliesOn.length > 0 && (
                <>
                  <H2>Used in</H2>
                  <ul>
                    {reliesOn.map(story => (
                      <li key={story.id}>
                        <Link to={story.path}>{story.name}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>

            <Features story={story} />
          </CardContainer>
        );
      }}
    </StoriesContext.Consumer>
  );
};

StoryRoute.layout = layout;

export default StoryRoute;
