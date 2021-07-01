import './Home.module.css';

import React, { useEffect, useState } from 'react';

import api from '../../auth';
import EventCalendar from '../../components/public/competitions/EventCalendar';
import MainList from '../../components/public/competitions/MainList';
import { Competition } from '../../utils/interfaces';

const HomePage: React.FC = (): JSX.Element => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      api.competitions.list().then(res => {
        setCompetitions(res.data);
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="center-col">
      <div className="center-width">
        <MainList competitions={competitions} />
      </div>
      <div className="center">
        <EventCalendar competitions={competitions} />
      </div>
    </div>
  );
};

export default HomePage;
