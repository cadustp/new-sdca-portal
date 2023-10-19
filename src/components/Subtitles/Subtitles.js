import React from 'react';
import classes from './Subtitles.module.css';

const Subtitles = props => <div className={classes.Subtitles}>{props.children}</div>;

export default Subtitles;
