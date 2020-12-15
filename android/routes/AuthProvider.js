import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import { useBluetoothStatus } from "react-native-bluetooth-status";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [userData, setUserData] = useState(null);
  const [scanned, setScanned] = useState(null);
  const [btStatus, isPending, setBluetooth] = useBluetoothStatus();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData,
        userName,
        setUserName,
        userBalance,
        scanned,
        setScanned,
        setUserBalance,
        btStatus,
        isPending,
        setBluetooth,
        login: async (email, password) => {
          return new Promise(async (res, rej) => {
            if (email === "" || password === "") {
              rej("Empty email or password fields");
              return;
            }
            try {
              await auth().signInWithEmailAndPassword(email, password);
              res();
            } catch (error) {
              if (error.code === "auth/unknown") {
                rej("Network Error. Please check your wifi or mobile data.");
              } else rej(error.message.split("]")[1]);
            }
          });
        },
        register: async (email, password) => {
          return new Promise(async (res, rej) => {
            if (email === "" || password === "") {
              rej("Empty email or password fields");
              return;
            }
            try {
              await auth().createUserWithEmailAndPassword(email, password);
              res();
            } catch (error) {
              if (error.code === "auth/unknown") {
                rej("Network Error. Please check your wifi or mobile data.");
              } else rej(error.message.split("]")[1]);
            }
          });
        },
        logout: async () => {
          return new Promise((res, rej) => {
            const unsubscribe = auth().onAuthStateChanged(async (user) => {
              try {
                if (user) {
                  await auth().signOut();
                  res();
                  unsubscribe();
                } else {
                  unsubscribe();
                }
              } catch (error) {
                rej(error);
                unsubscribe();
              }
            });
          });
        },
      }}
      v
    >
      {children}
    </AuthContext.Provider>
  );
};
