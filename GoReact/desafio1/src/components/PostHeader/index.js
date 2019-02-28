import React from 'react';
import moment from 'moment';

// import { Container } from './styles';

const PostHeader = ({ header }) => (
  <div className="headerPost">
    <img alt="" src={header.image} />
    <div className="text">
      <span>{header.name}</span>
      <small>
        {moment.locale('pt-br')
          && moment(header.dateCreated, 'YYYY/DD/MM HH:mm')
            .startOf('hour')
            .fromNow()}
      </small>
    </div>
  </div>
);

export default PostHeader;
