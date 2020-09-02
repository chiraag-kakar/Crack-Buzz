import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";

const News = (props) => {
  return (
    <IonPage>
      <SmallHeader title="Buzz" />
      <IonContent fullscreen>
        <LargeHeader title="Buzz" />
        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default News;
