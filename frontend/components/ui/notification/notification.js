import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import Head from 'next/head'

import classes from './notification.module.css';

function Notification(props) {
  const { title, message, status, submitting } = props;

  const [_document, set_document] = useState(null)

  // const clickHandler = (e) => {
  //   if (e.target.className === classes.notification) {
  //     set_document(null)
  //   }
  // }

  useEffect(() => set_document(document), [])

  console.log("Notification(props)", props)

  let statusClasses = '';

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (submitting === false) {
    statusClasses = classes.hidden;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal(( <div className={cssClasses}><h2>{title}</h2><p>{message}</p> </div>), document.getElementById("overlays") )



}

export default Notification;
