import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";
import LinkList from "../../components/Link/LinkList";

const Trending = (props) => {
  return (
    <IonPage>
      <SmallHeader title="Trending" />
      <IonContent fullscreen>
        <LargeHeader title="Trending" />
        <LinkList location={props.location} />
      </IonContent>
    </IonPage>
  );
};

export default Trending;
