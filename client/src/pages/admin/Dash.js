import React, { useState, useEffect } from "react";
import { Card, Statistic } from "antd";
import { useHistory } from "react-router-dom";

const TicketStats = () => {
  const [unClaimed, setUnClaimed] = useState();
  const [open, setOpen] = useState();
  const [complete, setComplete] = useState();

  const history = useHistory();
  
  useEffect(() => {
    async function auth() {
      await fetch(`/api/v1/auth/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          const res = response;
          if (res.auth === false ) {
            history.push("/login");
          } else {
            return console.log("logged in");
          }
        });
    }
    auth();
    // eslint-disable-next-line
  }, []);

  const fetchOpen = async () => {
    await fetch(`/api/v1/data/getallopen`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setOpen(result.result);
      });
  };

  const fetchClosed = async () => {
    await fetch(`/api/v1/data/getallcompleted`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setComplete(result.result);
      });
  };

  const fetchUnissued = async () => {
    await fetch(`/api/v1/data/unallocatedTickets`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUnClaimed(result.result);
      });
  };

  useEffect(() => {
    fetchOpen();
    fetchClosed();
    fetchUnissued();
  }, []);

  return (
    <div className="admin-dash-row">
      <div className="stats-card">
        <Card>
          <Statistic title="Closed Tickets" value={complete} />
        </Card>
      </div>
      <div className="stats-card">
        <Card>
          <Statistic title="Open Tickets" value={open} />
        </Card>
      </div>
      <div className="stats-card">
        <Card>
          <Statistic title="Unclaimed Tickets" value={unClaimed} />
        </Card>
      </div>
    </div>
  );
};

const Dash = () => {
  return (
    <div>
      <TicketStats />
    </div>
  );
};

export default Dash;
