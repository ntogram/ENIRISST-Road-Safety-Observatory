import React, {Component, useEffect, useRef, useState} from "react";
import {useMap, ZoomControl} from "react-leaflet"
import L from "leaflet";
export default function ZoomController(){

   const map = useMap()
  //  console.log(map)
  //   const map = L.map('mymap', {
  // zoomSnap: 0.25});
    return (<ZoomControl zoomInText={'<svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n' +
                     ' width="30.000000pt" height="30.000000pt" viewBox="0 0 96.000000 94.000000"\n' +
                     ' preserveAspectRatio="xMidYMid meet">\n' +
                     '\n' +
                     '<g transform="translate(-25.000000,96.000000) scale(0.100000,-0.100000)"\n' +
                     'fill="#000000" stroke="none">\n' +
                     '<path d="M532 700 c-57 -13 -102 -70 -102 -129 0 -95 88 -160 179 -133 35 11\n' +
                     '37 10 83 -35 47 -46 48 -46 68 -28 l21 19 -45 45 -45 46 6 66 c5 63 4 67 -26\n' +
                     '102 -41 46 -82 60 -139 47z m77 -55 c83 -42 49 -165 -46 -165 -80 0 -114 102\n' +
                     '-52 154 35 30 58 32 98 11z"/>\n' +
                     '<path d="M550 605 c0 -18 -5 -25 -20 -25 -11 0 -20 -4 -20 -10 0 -5 9 -10 20\n' +
                     '-10 15 0 20 -7 20 -25 0 -16 6 -25 15 -25 9 0 15 9 15 25 0 18 5 25 20 25 11\n' +
                     '0 20 5 20 10 0 6 -9 10 -20 10 -15 0 -20 7 -20 25 0 16 -6 25 -15 25 -9 0 -15\n' +
                     '-9 -15 -25z"/>\n' +
                     '</g>\n' +
                     '</svg>'}  zoomOutText={'<svg version="1.0" xmlns="http://www.w3.org/2000/svg"\n' +
                     ' width="30.000000pt" height="30.000000pt" viewBox="0 0 96.000000 94.000000"\n' +
                     ' preserveAspectRatio="xMidYMid meet">\n' +
                     '\n' +
                     '<g transform="translate(0.000000,94.000000) scale(0.100000,-0.100000)"\n' +
                     'fill="#000000" stroke="none">\n' +
                     '<path d="M282 700 c-102 -23 -135 -152 -59 -227 39 -40 106 -55 147 -33 20 11\n' +
                     '27 7 71 -36 48 -47 49 -47 69 -29 l21 19 -47 47 c-37 38 -45 51 -39 69 36 114\n' +
                     '-52 215 -163 190z m77 -54 c29 -15 51 -53 51 -87 0 -35 -53 -79 -95 -79 -80 0\n' +
                     '-114 92 -56 151 33 32 58 36 100 15z"/>\n' +
                     '<path d="M260 570 c0 -6 27 -10 60 -10 33 0 60 4 60 10 0 6 -27 10 -60 10 -33\n' +
                     '0 -60 -4 -60 -10z"/>\n' +
                     '</g>\n' +
                     '</svg>\n'}  />)



}

