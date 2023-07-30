// Import the necessary DOM elements
const notesTableBody = document.getElementById("notes-table-body");
const archivedNotesTableBody = document.getElementById("archived-notes-table-body");
const summaryTableBody = document.getElementById("summary-table-body");

// Example data for the notes app (7 prepopulated notes)
let notes = [
  {
    id: 1,
    createdAt: new Date("2023-07-20"),
    content: "I'm going to the dentist tomorrow",
    category: "Task",
  },
  // Add other prepopulated notes here...
];

// Function to render the notes table
function renderNotesTable() {
  notesTableBody.innerHTML = "";
  notes.forEach((note) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${note.createdAt.toLocaleString()}</td>
      <td>${note.content}</td>
      <td>${note.category}</td>
      <td>${extractDatesFromString(note.content).join(", ")}</td>
      <td>
        <button onclick="editNote(${note.id})">Edit</button>
        <button onclick="archiveNote(${note.id})">Archive</button>
      </td>
    `;
    notesTableBody.appendChild(row);
  });
}

// Function to render the archived notes table
function renderArchivedNotesTable() {
  archivedNotesTableBody.innerHTML = "";
  const archivedNotes = notes.filter((note) => note.archived);
  archivedNotes.forEach((note) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${note.createdAt.toLocaleString()}</td>
      <td>${note.content}</td>
      <td>${note.category}</td>
      <td>${extractDatesFromString(note.content).join(", ")}</td>
      <td>
        <button onclick="unarchiveNote(${note.id})">Unarchive</button>
      </td>
    `;
    archivedNotesTableBody.appendChild(row);
  });
}

// Function to extract dates from the note content using regular expressions
function extractDatesFromString(content) {
  const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  return content.match(datePattern) || [];
}

// Function to update the summary table
function updateSummaryTable() {
  const categories = ["Task", "Random Thought", "Idea"];
  summaryTableBody.innerHTML = "";
  categories.forEach((category) => {
    const activeCount = notes.filter((note) => !note.archived && note.category === category).length;
    const archivedCount = notes.filter((note) => note.archived && note.category === category).length;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${category}</td>
      <td>${activeCount}</td>
      <td>${archivedCount}</td>
    `;
    summaryTableBody.appendChild(row);
  });
}


// Function to edit a note
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

// Function to archive a note
function archiveNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = true;
    renderNotesTable();
    renderArchivedNotesTable();
    updateSummaryTable();
  }
}

// Function to unarchive a note
function unarchiveNote(noteId) {
  const noteIndex = notes.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = false;
    renderArchivedNotesTable();
    updateSummaryTable();
  }
}


// Initial rendering of the app
renderNotesTable();
renderArchivedNotesTable();
updateSummaryTable();
