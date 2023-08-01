const notesTableBody = document.getElementById("notes-table-body");
const archivedNotesTableBody = document.getElementById(
  "archived-notes-table-body"
);
const summaryTableBody = document.getElementById("summary-table-body");

let notes = [
  {
    id: 1,
    createdAt: new Date("2023-07-19"),
    content: "Dentist 20/07/2023 and then 25/07/2023",
    category: "Task",
  },
  {
    id: 2,
    createdAt: new Date("2023-05-10"),
    content: "Start coffee business",
    category: "Idea",
  },
  {
    id: 3,
    createdAt: new Date("2023-07-12"),
    content: "Buy earrings from Instagram shop",
    category: "Random Thought",
  },
  {
    id: 4,
    createdAt: new Date("2023-06-14"),
    content: "Birthday present for Katya - Pandora ring",
    category: "Idea",
  },
  {
    id: 5,
    createdAt: new Date("2023-05-18"),
    content: "Send documents to partner 05/08/2023",
    category: "Task",
  },
  {
    id: 6,
    createdAt: new Date("2023-07-29"),
    content: "Budynok dyva in Kyiv",
    category: "Random Thought",
  },
  {
    id: 7,
    createdAt: new Date("2023-07-24"),
    content: "Date idea: Museum of water visit",
    category: "Idea",
  },
];


function renderNotesTable() {
  notesTableBody.innerHTML = "";
  notes.forEach((note) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formatDate(note.createdAt)}</td>
      <td>${note.category}</td>
      <td>${note.content}</td>
      <td>${extractDatesFromString(note.content).join(", ")}</td>
      <td>
        <button onclick="editNote(${note.id})">Edit</button>
        <button onclick="archiveNote(${note.id})">Archive</button>
      </td>
    `;
    notesTableBody.appendChild(row);
  });
}


function renderArchivedNotesTable() {
  archivedNotesTableBody.innerHTML = "";
  const archivedNotes = notes.filter((note) => note.archived);
  archivedNotes.forEach((note) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formatDate(note.createdAt)}</td>
      <td>${note.category}</td>
      <td>${note.content}</td>
      <td>${extractDatesFromString(note.content).join(", ")}</td>
      <td>
        <button onclick="unarchiveNote(${note.id})">Unarchive</button>
      </td>
    `;
    archivedNotesTableBody.appendChild(row);
  });
}


function extractDatesFromString(content) {
  const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  return content.match(datePattern) || [];
}

function updateSummaryTable() {
  const categories = ["Task", "Random Thought", "Idea"];
  summaryTableBody.innerHTML = "";
  categories.forEach((category) => {
    const activeCount = notes.filter(
      (note) => !note.archived && note.category === category
    ).length;
    const archivedCount = notes.filter(
      (note) => note.archived && note.category === category
    ).length;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${category}</td>
      <td>${activeCount}</td>
      <td>${archivedCount}</td>
    `;
    summaryTableBody.appendChild(row);
  });
}


function editNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    const newContent = prompt("Enter the updated note content:");
    if (newContent !== null && newContent.trim() !== "") {
      notes[noteIndex].content = newContent;
      renderNotesTable();
      updateSummaryTable();
    }
  }
}


function archiveNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = true;
    renderNotesTable();
    renderArchivedNotesTable();
    updateSummaryTable();
  }
}


function unarchiveNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = false;
    renderArchivedNotesTable();
    updateSummaryTable();
  }
}

function formatDate(date) {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}


renderNotesTable();
renderArchivedNotesTable();
updateSummaryTable();
