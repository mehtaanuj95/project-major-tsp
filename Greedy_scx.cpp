#include <bits/stdc++.h>
using namespace std;
int main() {
	
	// GREEDY SCX
	
	
	
	int cost[7][7],k,x,i1,i2,s;
	int v=1,ans[7],c[10],d[7],r,i;
	
	cost[0][0] = 999; cost[0][1] = 75; cost[0][2] = 99; cost[0][3] = 9;
	cost[0][4] = 35; cost[0][5] = 63; cost[0][6] = 8;
	
	cost[1][0] = 51; cost[1][1] = 999; cost[1][2] = 86; 
	cost[1][3] = 46; cost[1][4] = 88; cost[1][5] = 29; cost[1][6] = 20;
	
    cost[2][0] = 100; cost[2][1] = 5; cost[2][2] = 999; cost[2][3] = 16;
    cost[2][4] = 28; cost[2][5] = 35; cost[2][6] = 28;
    
    cost[3][0] = 20; cost[3][1] = 45; cost[3][2] = 11; 
    cost[3][3] = 999; cost[3][4] = 59; cost[3][5] = 53; cost[3][6] = 49;
    
    cost[4][0] = 86; cost[4][1] = 63; cost[4][2] = 33; cost[4][3] = 65;
    cost[4][4] = 999; cost[4][5] = 76; cost[4][6] = 72;
    
    cost[5][0] = 36; cost[5][1] = 53; cost[5][2] = 89; cost[5][3] = 31;
    cost[5][4] = 21; cost[5][5] = 999; cost[5][6] = 52;
    
    cost[6][0] = 58; cost[6][1] = 31; cost[6][2] = 43; cost[6][3] = 67;
    cost[6][4] = 52; cost[6][5] = 60; cost[6][6] = 999;


   int p1[7]={1,5,7,3,6,4,2};
   int p2[7]={1,6,2,4,3,5,7};
   
   x=p1[0];
   for(i=1;i<=7;i++)
   d[i]=0;

   ans[v-1]=x;
   while(v<7)
   {
       d[x]=1;
       k=0;
    for(i=0;i<7;i++)
    {
        if(p1[i]==x)
        {
            i1=i;
            break;
        }
    }
    
    for(i=0;i<7;i++)
    {
        if(p2[i]==x)
        {
            i2=i;
            break;
        }
    }

     
     for(i=i1+1;i<7;i++)
     {
         if(d[p1[i]]==0)
         {
             c[k++]=p1[i];
         }
     }
     
       for(i=i2+1;i<7;i++)
     {
         if(d[p2[i]]==0)
         {
             c[k++]=p2[i];
         }
     }
    
     r=INT_MAX;
     for(i=0;i<k;i++)
     
     {
         if(r>cost[x-1][c[i]-1])
         {
             r=cost[x-1][c[i]-1];
             s=c[i];
         }
         
     }
     
     
     v++;
     ans[v-1]=s;
     x=s;
   
}
int finalcost=cost[ans[v-1]-1][ans[0]-1];

cout<<"Final Path:"<<endl;
for(i=0;i<v-1;i++)
{
finalcost+=cost[ans[i]-1][ans[i+1]-1];
cout<<ans[i]<<" ";
}
cout<<endl<<"Total Cost :"<<finalcost<<endl;
	
	return 0;
}


