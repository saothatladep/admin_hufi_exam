import React from 'react';
import { Helmet } from 'react-helmet';
const Meta = (props) => {
  const { title, description, keywords } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to TonTon admin examination',
  description: 'TonTon admin exam is a one top website for managing examination.',
  keywords: 'exam, admin, examination, manage',
};

export default Meta;
