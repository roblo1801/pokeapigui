"use client";
import React from "react";
import Ticker from "react-ticker";

function Footer() {
  return (
    <div>
      <div style={{ background: "white" }}>
        <Ticker speed={4}>
          {({ index }) => (
            <h1
              style={{
                padding: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Archivo",
              }}
            >
              Check out my other websites @
            </h1>
          )}
        </Ticker>
      </div>
      <div style={{ background: "black" }}>
        <Ticker>
          {() => (
            <h1
              style={{
                color: "white",
                padding: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Archivo",
              }}
            >
              Toy Haven
            </h1>
          )}
        </Ticker>
      </div>
      <div style={{ background: "green" }}>
        <Ticker speed={3}>
          {() => (
            <h1
              style={{
                color: "white",
                padding: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Archivo",
              }}
            >
              Pinpoint Painting and Pressure Washing
            </h1>
          )}
        </Ticker>
      </div>

      <div style={{ background: "#fcebce" }}>
        <Ticker speed={4}>
          {({ index }) => (
            <h1
              style={{
                // color: "white",
                padding: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Archivo",
              }}
            >
              React MMO
            </h1>
          )}
        </Ticker>
      </div>
      <div style={{ background: "red" }}>
        <Ticker speed={2}>
          {({ index }) => (
            <h1
              style={{
                color: "white",
                padding: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Archivo",
              }}
            >
              PokeApi Pokedex
            </h1>
          )}
        </Ticker>
      </div>
      <div style={{ background: "#fccc02" }}>
        <Ticker speed={4}>
          {({ index }) => (
            <h1
              style={{
                color: "white",
                padding: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Archivo",
              }}
            >
              Where We gon&apos; Eat?
            </h1>
          )}
        </Ticker>
      </div>
      <div style={{ background: "#6ae1f5" }}>
        <Ticker speed={3.5}>
          {({ index }) => (
            <h1
              style={{
                // color: "white",
                padding: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Archivo",
              }}
            >
              PokeApi Pokedex
            </h1>
          )}
        </Ticker>
      </div>
    </div>
  );
}

export default Footer;
