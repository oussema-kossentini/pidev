export enum TypeEvaluation {
    QUIZZ = 'QUIZZ',
    SOLVED_PROBLEME = 'SOLVED_PROBLEME',
  }
  export enum Categorie {
    MATH = 'MATH',
    INFORMATIQUE = 'INFORMATIQUE',
    HISTOIRE = 'HISTOIRE',
    SCEANCE = 'SCEANCE',
  }


  export interface Evaluation {
    idEvaluation: string;
    title: string;
    description: string;
    typeEvaluation: TypeEvaluation;
    startDate: Date;
    endDate: Date;
    statue: boolean;
    accessible: boolean;
    duration: number;
    categorie: Categorie; // Duration in milliseconds

    qas: QA[]; // Replace with the 'QA' model if you have one
    grades: Grade[]; // Replace with the 'Grade' model if you have one
  }

  // Replace these with actual interfaces if they are defined elsewhere in your application


  export interface QA {
    question: string;
    response: string[]; // Si vous avez `response` au lieu de `responses`
    score: number;
    idQa: string; // Si l'identifiant est `idQa` au lieu de `id`
    // Ajoutez `difficulty` si manquant
    difficulty?: string; // Marqué comme optionnel selon vos besoins

    evaluationId?: string;
  }

  export interface Grade {
    // Define properties here
  }
