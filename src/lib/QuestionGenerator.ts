export interface Question {
    question: Record<string, string>;
    symbolicMode: string;
    numericMode: number;
  }
  
export function generateQuestion(): Question {
    const permissions = ['r', 'w', 'x'];
    const roles = ['User', 'Group', 'World'];

    let question: Record<string, string> = {};
    let symbolicMode = '';
    let numericMode = 0;

    roles.forEach((role, idx) => {
        let rolePerms = '';
        let roleValue = 0;

        permissions.forEach((perm, permIdx) => {
        if (Math.random() > 0.5) {
            rolePerms += perm;
            roleValue += 2 ** (2 - permIdx); // Convert rwx to the numeric value (r=4, w=2, x=1)
        } else {
            rolePerms += '-';
        }
        });

        question[role] = rolePerms;
        symbolicMode += rolePerms;
        numericMode = numericMode * 10 + roleValue;
    });

    return {
        question,
        symbolicMode,
        numericMode,
    };
}