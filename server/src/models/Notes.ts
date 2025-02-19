export interface Notes {
    TopicID?: number;
    Title?: string;
    Description?: string;
    ContentURL?: string;
}
export async function fetchNotes(): Promise<Notes[]> {
    try {
      const response = await fetch('https://yourapi.com/api/patients');
      if (!response.ok) {
        throw new Error(`Error fetching notes: ${response.statusText}`);
      }
      const data: Notes[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error in fetchNotes:', error);
      throw error; // Rethrow for higher-level handling
    }
  }
  
  // 3. Example utility function for transforming the data (Optional)
  export function formatNotes(note: Notes): string {
    return `${note.Title}: ${note.Description}`;
  }

// export interface Notes {
//   TopicID?: number;
//   Title?: string;
//   Description?: string;
//   ContentURL?: string;
// }

// export async function fetchNotes(): Promise<Notes[]> {
//   try {
//       const response = await fetch('https://yourapi.com/api/notes', {
//           method: 'GET',
//           headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
              
//           }
//       });

//       const text = await response.text(); 
//       console.log("API Response:", text); 

//       if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
//       }

      
//       if (text.startsWith('<')) {
//           throw new Error(`Invalid JSON response received: ${text}`);
//       }

//       return JSON.parse(text); 
//   } catch (error) {
//       console.error('Error in fetchNotes:', error);
//       return []; 
//   }
// }

// export function formatNotes(note: Notes): string {
//       return `${note.Title}: ${note.Description}`;
//     }
  