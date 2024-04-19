"use client";

import { io } from "socket.io-client";

export const socket = io("ws://moola-api-af585bc6e073.herokuapp.com/");