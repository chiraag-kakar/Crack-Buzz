import React from "react";
import { IonPage, IonContent, IonSearchbar } from "@ionic/react";
import firebase from "../../firebase";
import LinkItem from "../../components/Link/LinkItem";
import SmallHeader from "../../components/Header/SmallHeader";
import LargeHeader from "../../components/Header/LargeHeader";

const Search = () => {
  const [links, setLinks] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [filteredLinks, setFilteredLinks] = React.useState([]);

  React.useEffect(() => {
    getInitialLinks();
    //eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [filter]);

  function getInitialLinks() {
    firebase.db
      .collection("links")
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setLinks(links);
      });
  }

  function handleChange(evt) {
    if (evt.key === "Enter") {
      setFilter(evt.target.value);
    }
  }

  function handleSearch() {
    const query = filter.toLowerCase();
    const matchedLinks = links.filter((link) => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLinks(matchedLinks);
  }

  return (
    <IonPage>
      <SmallHeader title="Search" />
      <IonContent fullscreen>
        <LargeHeader title="Search" />
        <IonSearchbar
          placeholder="Search"
          spellcheck="false"
          type="url"
          value={filter}
          onKeyPress={handleChange}
          animated
        />
        {filteredLinks.map((filteredLink, index) => (
          <LinkItem
            key={filteredLink.id}
            showCount={false}
            link={filteredLink}
            index={index}
            url={`/link/${filteredLink.id}`}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Search;
