import React from "react";

export default function SimpleContactList({ contacts }) {
  const list = () => {
    return contacts.map((contact) => {
      return (
        <li key={contact._id}>
          {contact.firstName} {contact.lastName} - {contact.email}
        </li>
      );
    });
  };

  return (
    <div>
      <ul>{list()}</ul>
    </div>
  );
}
