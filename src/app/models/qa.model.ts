export interface QA {
  question: string;
  response: string[]; // Si vous avez `response` au lieu de `responses`
  score: number;
  idQa: string; // Si l'identifiant est `idQa` au lieu de `id`
  // Ajoutez `difficulty` si manquant
  difficulty?: string; // Marqué comme optionnel selon vos besoins
  
  evaluationId?: string; // Supposons que vous avez l'ID de l'évaluation associée
}

  
  
  
 