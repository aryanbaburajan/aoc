#include <bits/stdc++.h>

bool check(std::vector<int> &b)
{
    std::vector<int> diffs;
    for (int i = 0; i < b.size() - 1; i++)
        diffs.push_back(b[i + 1] - b[i]);

    int min = *std::min_element(diffs.begin(), diffs.end());
    int max = *std::max_element(diffs.begin(), diffs.end());

    if (min / abs(min) == max / abs(max) && abs(min) >= 1 && abs(min) <= 3 && abs(max) >= 1 && abs(max) <= 3)
        return true;
    return false;
}

int main()
{
    std::vector<std::vector<int>> a;

    std::string line;
    while (std::getline(std::cin, line))
    {
        std::istringstream iss(line);
        int num;
        std::vector<int> b;
        while (iss >> num)
            b.push_back(num);
        a.push_back(b);
    }

    int result = 0;

    for (std::vector<int> b : a)
    {
        if (check(b))
        {
            result++;
        }
        else
        {
            for (int i = 0; i < b.size(); i++)
            {
                std::vector<int> c = b;
                c.erase(c.begin() + i);
                if (check(c))
                {
                    result++;
                    break;
                }
            }
        }
    }

    std::cout << result << std::endl;
}
