import React, { useState, useEffect } from "react";
import Board from "./board";
import axios from "axios";

function DataProcessing() {
  const [processed, setProcessed] = useState(null);

  function fetching() {
    const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment/";
    axios
      .get(apiUrl)
      .then((response) => {
        localStorage.setItem("data", JSON.stringify(response.data));
        extract();
      })
      .catch((error) => {
        console.log("failed");
      });
  }

  useEffect(() => {
    console.log("useefe");
    fetching();
  }, []);

  function handleLocalStorageChange() {
    fetching();
  }

  useEffect(() => {
    window.addEventListener("storage", handleLocalStorageChange);
    return () => {
      window.removeEventListener("storage", handleLocalStorageChange);
    };
  }, []);

  async function extract() {
    let group = "status",
      order = "priority";

    if (localStorage.getItem("grouping") != null) {
      group = localStorage.getItem("grouping");
    } else {
      localStorage.setItem("grouping", "status");
    }
    if (localStorage.getItem("ordering") != null) {
      order = localStorage.getItem("ordering");
    } else {
      localStorage.setItem("ordering", "priority");
    }

    const data = JSON.parse(localStorage.getItem("data"));
    console.log("grouping", group);
    console.log("orering", order);
    console.log("data", data);
    let groupedData;
    const tickets = data.tickets;

    if (group === "status") {
      const statusTickets = {
        todo: [],
        inprogress: [],
        backlog: [],
        done: [],
        cancelled: [],
      };

      //pushing relavent data
      tickets.forEach((ticket) => {
        const status = ticket.status;
        if (status === "Todo") {
          statusTickets.todo.push(ticket);
        } else if (status === "In progress") {
          statusTickets.inprogress.push(ticket);
        } else if (status === "Backlog") {
          statusTickets.backlog.push(ticket);
        }
      });

      groupedData = statusTickets;
    } else if (group === "priority") {
      // Group the tickets by priority
      const priorityTickets = {
        4: [],
        3: [],
        2: [],
        1: [],
        0: [],
      };

      tickets.forEach((ticket) => {
        const priority = ticket.priority;
        priorityTickets[priority].push(ticket);
      });
      groupedData = priorityTickets;
    } else if (group === "user") {
      const users = data.users;
      const groupedTicketsByUser = {};

      users.forEach((user) => {
        groupedTicketsByUser[user.id] = [];
      });

      tickets.forEach((ticket) => {
        const userId = ticket.userId;
        groupedTicketsByUser[userId].push(ticket);
      });

      groupedData = groupedTicketsByUser;
    }

    //sorting
    if (order === "priority") {
      for (const key in groupedData) {
        if (groupedData.hasOwnProperty(key)) {
          groupedData[key] = groupedData[key].sort((a, b) => {
            return b.priority - a.priority;
          });
        }
      }
    } else if (order === "title") {
      for (const key in groupedData) {
        if (groupedData.hasOwnProperty(key)) {
          groupedData[key] = groupedData[key].sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
          });
        }
      }
    }
    setProcessed(groupedData);
  }
  return <Board data={processed} />;
}

export default DataProcessing;
