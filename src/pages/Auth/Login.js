import React from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
  IonCol,
  IonButton,
  IonRouterLink,
  IonLoading,
} from "@ionic/react";
import NavHeader from "../../components/Header/NavHeader";
import validateLogin from "../../validators/validateLogin";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import { toast } from "../../helpers/toast";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateLogin,
    authenticateUser
  );
  const [busy, setBusy] = React.useState(false);

  async function authenticateUser() {
    setBusy(true);
    const { email, password } = values;
    try {
      await firebase.login(email, password);
      toast("You have logged in successfully!");
      props.history.push("/");
    } catch (err) {
      console.error("Authentication Error", err);
      toast(err.message);
    }
    setBusy(false);
  }

  return (
    <IonPage>
      <NavHeader title="Log In" />
      <IonLoading message={"Please wait..."} isOpen={busy} />
      <IonContent>
        <IonItem lines="full">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            name="email"
            type="text"
            value={values.email}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="full">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            name="password"
            type="password"
            value={values.password}
            onIonChange={handleChange}
            required
          ></IonInput>
        </IonItem>
        <IonRow>
          <IonCol>
            <IonButton
              type="submit"
              color="primary"
              expand="block"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Log In
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class="ion-text-center ion-padding-vertical">
            <IonRouterLink routerLink={"/forgot"}>
              Forgot Password?
            </IonRouterLink>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
